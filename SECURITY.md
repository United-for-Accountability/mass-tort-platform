# Security maintenance

Report suspected vulnerabilities privately to a repository maintainer. Do not include
personal testimony, authority documents, credentials, or exploit details in public issues.

## Automated checks

- CI runs regression tests, production builds, and an npm vulnerability audit on pull requests.
- A separate workflow audits dependencies and runs CodeQL weekly and on pull requests.
  Its first GitHub run must confirm code-scanning permissions/default-setup compatibility.
- Dependabot proposes npm and GitHub Actions updates weekly after its configuration is merged.
- Keep security updates current and review the scoped Firestore gRPC override when upgrading Firebase.

## Application protections

The Next.js API proxy rejects unsupported methods/content types, cross-origin browser
writes, oversized or malformed JSON, and invalid assistant payloads before route handlers.
It returns non-cacheable errors and `Retry-After` with HTTP 429 responses.

Assistant endpoints share a quota of 30 requests per minute; submission endpoints share
10; status and admin endpoints each allow 60. These quotas apply per client IP **per
running process**, reset on process restart, and do not provide a distributed spending
cap. IPs are hashed with a process-random salt; expired entries are removed on subsequent
requests. No raw IPs are stored by the limiter.
On Vercel, identity uses its platform-supplied `x-forwarded-for`. On other hosts,
untrusted forwarded headers are ignored and callers share one fallback quota. Deploy a
trusted gateway/distributed limiter before scaling or relying on this as cost protection.

JSON is limited to 64 KB (admin writes: 16 KB), conversations to 40 messages/32,000
characters total, and each message to 8,000 characters. Authority uploads keep the
existing 10 MB file cap plus bounded form fields and temporary-file cleanup. The proxy
buffer cap includes multipart overhead; it is not a substitute for Formidable's limits.

The Content Security Policy currently restricts framing, base URLs and embedded objects.
It does not yet restrict script sources; analytics, reCAPTCHA and Next.js inline scripts
need a separately tested nonce-based policy.

## Deployment controls still requiring verification

- Firestore/Storage rules must prevent anonymous reads of testimony/contact details,
  writes to verification status, and access to authority documents. API checks cannot
  protect forms that write directly from the browser to Firebase.
- Migrate privileged server operations to server-only credentials and enforce individual
  authenticated admin roles before locking down database rules. The current server
  uses the Firebase client SDK; changing rules blindly can break submissions/admin tools.
- Replace shared admin tokens with individual accounts, MFA and auditable permissions.
- Restrict authority-document downloads; stored Firebase download-token URLs grant access
  to anyone holding the link. Add malware scanning and a reviewed retention policy.
- Add distributed firewall quotas, provider spending limits/alerts, bounded provider
  response sizes and timeouts, and validated production CAPTCHA hostnames.
- Enable GitHub secret scanning, push protection and Dependabot alerts in repository
  settings if not already enabled. Configuration files alone do not enable these settings.
- Verify backup retention and an isolated restore; monitor failed submissions using logs
  that exclude testimony, document contents and credentials.
- Verify production/preview behavior after merging, including all forms and admin exports.

Never test access controls by downloading real private submissions into CI artifacts.

## Vercel firewall drafts prepared November 17, 2026

Project: `cordova-projects/mass-tort-platform`.

Two logging-only rules are staged, not published:

| Rule | POST endpoints | Observation threshold per IP |
| --- | --- | --- |
| Observe assistant API bursts | `/api/ai`, `/api/ask`, `/api/story-guide`, `/api/story-helper` | 60 requests / 60 seconds |
| Observe submission API bursts | `/api/submit`, `/api/save-to-airtable`, `/api/cases/peoples-last-resort/submit` | 30 requests / 60 seconds |

Both use a fixed window and `rateLimit.action: log`. Neither blocks traffic when
published. Review the draft, publish logging first, inspect matching traffic, test
any proposed enforcement in preview, and only then consider production throttling.
Firewall counters are regional and are not a global spending cap.

```bash
vercel firewall diff --project mass-tort-platform --scope cordova-projects
# Maintainer publication step, after reviewing the draft:
vercel firewall publish --project mass-tort-platform --scope cordova-projects
```

Traffic review:
- [Assistant bursts](https://vercel.com/cordova-projects/mass-tort-platform/firewall/traffic?filter=rule_observe_assistant_api_bursts_0llxov)
- [Submission bursts](https://vercel.com/cordova-projects/mass-tort-platform/firewall/traffic?filter=rule_observe_submission_api_bursts_mxqkOD)

GitHub returned HTTP 403 when enabling vulnerability alerts/secret-scanning settings;
those settings remain unverified. Firebase rule enforcement, backups, malware scanning,
and account MFA were not accessible through the connected tools.

Hosting-platform request limits can be lower than the application's 10 MB upload limit;
large-file support needs a separately reviewed direct-to-private-storage upload flow.
