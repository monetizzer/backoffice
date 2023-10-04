import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import { DocumentEntity } from "../types/document";

export default function Document({ document: d }: { document: DocumentEntity }) {
	const [documentPictureUrl, setDocumentPictureUrl] = useState<string | undefined>();
	const [selfieWithDocumentUrl, setSelfieWithDocumentUrl] = useState<string | undefined>();
  const { accessToken } = useAuthContext();

  const onApprove = async () => {
    await fetch(`${import.meta.env['VITE_API_URL']}/documents/review`, {
      method: 'POST',
      body: JSON.stringify({
        accountId: d.accountId,
        approve: true,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })

    window.alert('Success!')
  }

  const onReject = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const message = document.getElementById(`message-${d.accountId}`)?.value;

    if (!message) {
      window.alert('Missing message!')

      return;
    }

    await fetch(`${import.meta.env['VITE_API_URL']}/documents/review`, {
      method: 'POST',
      body: JSON.stringify({
        accountId: d.accountId,
        approve: false,
        message
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })

    window.alert('Success!')
  }

	useEffect(() => {
		const f = async () => {
			if (!accessToken || !d.documentPictureUrl || !d.selfieWithDocumentUrl) return;

      const documentPictureBlob = await fetch(d.documentPictureUrl!, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(r => r.blob())

			setDocumentPictureUrl(URL.createObjectURL(documentPictureBlob))

      const selfieWithDocumentBlob = await fetch(d.selfieWithDocumentUrl!, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(r => r.blob())

			setSelfieWithDocumentUrl(URL.createObjectURL(selfieWithDocumentBlob))
		}

		f();
	}, [accessToken, d.documentPictureUrl, d.selfieWithDocumentUrl])

	if (!documentPictureUrl || !selfieWithDocumentUrl) {
		return (
			<>
				Loading...
			</>
		)
	}

	return (
		<div style={{ border: '1px solid black'}}>
			<ul>
				<li>
					<strong>accountId:</strong> {d.accountId}
				</li>
				<li>
					<strong>status:</strong> {d.status}
				</li>
				<li>
					<strong>type:</strong> {d.type}
				</li>
				<li>
					<strong>documentNumber:</strong> {d.documentNumber}
				</li>
				<li>
					<strong>fullName:</strong> {d.fullName}
				</li>
				<li>
					<strong>birthDate:</strong> {d.birthDate}
				</li>
				<li>
					<strong>phone:</strong> {d.phone}
				</li>

				<strong>Address</strong>
				<ul>
					<li>
						<strong>line1:</strong> {d.address?.line1}
					</li>
					<li>
						<strong>line2:</strong> {d.address?.line2}
					</li>
					<li>
						<strong>postalCode:</strong> {d.address?.postalCode}
					</li>
					<li>
						<strong>city:</strong> {d.address?.city}
					</li>
					<li>
						<strong>state:</strong> {d.address?.state}
					</li>
					<li>
						<strong>country:</strong> {d.address?.country}
					</li>
				</ul>

				<br />

				<img src={documentPictureUrl} style={{ maxWidth: '1000px', maxHeight: '1000px' }} />

				<br />

				<img src={selfieWithDocumentUrl} style={{ maxWidth: '1000px', maxHeight: '1000px' }} />
			</ul>

			<textarea id={`message-${d.accountId}`} style={{ width: '500px' }} />

			<br />

			<button onClick={() => onApprove()} style={{ backgroundColor: 'green', color: 'white' }}>Approve</button>
			<button onClick={() => onReject()} style={{ backgroundColor: 'red' }}>Reprove</button>
		</div>
	)
}