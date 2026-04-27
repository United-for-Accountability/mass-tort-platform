import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { peoplesLastResortCase } from '../../../../../data/contingentCases';
import { db } from '../../../../../lib/firebase';
import { assertAdminAuthorized } from '../../../../../lib/caseAdmin';

export default async function handler(req, res) {
  if (!assertAdminAuthorized(req, res)) {
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const pageSizeRaw = Number(req.query.pageSize ?? 50);
    const pageSize = Number.isFinite(pageSizeRaw) ? Math.max(1, Math.min(pageSizeRaw, 200)) : 50;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : '';

    let submissionsQuery = query(
      collection(db, peoplesLastResortCase.collectionName),
      orderBy('submittedAt', 'desc'),
      limit(pageSize)
    );

    if (cursor) {
      const cursorRef = doc(db, peoplesLastResortCase.collectionName, cursor);
      const cursorSnapshot = await getDoc(cursorRef);
      if (cursorSnapshot.exists()) {
        submissionsQuery = query(
          collection(db, peoplesLastResortCase.collectionName),
          orderBy('submittedAt', 'desc'),
          startAfter(cursorSnapshot),
          limit(pageSize)
        );
      }
    }

    const snapshot = await getDocs(submissionsQuery);
    const submissions = snapshot.docs.map((row) => {
      const data = row.data();
      return {
        id: row.id,
        fullName: data.fullName || '',
        email: data.email || '',
        location: data.location || '',
        submittedAt: data.submittedAt || null,
        verification_status: data.verification_status || 'pending-review',
        counted_toward_threshold: Boolean(data.counted_toward_threshold),
        review_note: data.review_note || '',
      };
    });

    const hasMore = snapshot.size === pageSize;
    const nextCursor = hasMore && snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;

    return res.status(200).json({ submissions, nextCursor, hasMore });
  } catch (error) {
    console.error('Error loading People\'s Last Resort submissions:', error);
    return res.status(500).json({ error: 'Unable to load submissions.' });
  }
}