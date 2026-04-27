import { collection, getDocs, query, where } from 'firebase/firestore';
import { peoplesLastResortCase } from '../../../../../data/contingentCases';
import { db } from '../../../../../lib/firebase';
import { assertAdminAuthorized, writeCaseAuditLog } from '../../../../../lib/caseAdmin';

function csvEscape(value) {
  const stringValue = (value ?? '').toString();
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
}

export default async function handler(req, res) {
  if (!assertAdminAuthorized(req, res)) {
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const exportQuery = query(
      collection(db, peoplesLastResortCase.collectionName),
      where('verification_status', '==', 'verified'),
      where('counted_toward_threshold', '==', true)
    );

    const snapshot = await getDocs(exportQuery);
    const headers = [
      'id',
      'fullName',
      'email',
      'phone',
      'location',
      'birthYear',
      'residencyState',
      'verificationMethod',
      'verificationReference',
      'signature_name',
      'clientSignedAt',
      'review_note',
    ];

    const lines = [headers.join(',')];

    snapshot.forEach((docEntry) => {
      const row = docEntry.data();
      const record = [
        docEntry.id,
        row.fullName,
        row.email,
        row.phone,
        row.location,
        row.birthYear,
        row.residencyState,
        row.verificationMethod,
        row.verificationReference,
        row.signature_name,
        row.clientSignedAt,
        row.review_note,
      ];
      lines.push(record.map(csvEscape).join(','));
    });

    await writeCaseAuditLog({
      caseSlug: peoplesLastResortCase.slug,
      action: 'verified-submissions-exported',
      req,
      details: { count: snapshot.size },
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="peoples-last-resort-verified-${timestamp}.csv"`);
    return res.status(200).send(lines.join('\n'));
  } catch (error) {
    console.error('Error exporting verified submissions:', error);
    return res.status(500).json({ error: 'Unable to export verified submissions.' });
  }
}