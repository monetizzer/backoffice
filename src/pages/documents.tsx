import { useEffect, useState } from "react";
import AuthLayout from "../layouts/auth";
import { useAuthContext } from "../context/auth";
import { DocumentEntity } from "../types/document";
import Document from "../components/Document";

export default function Documents() {
  const [documentsToReview, setDocumentsToReview] = useState<Array<DocumentEntity>>([])
  const { accessToken } = useAuthContext();

  useEffect(() => {
    const f = async () => {
      if (!accessToken) return;

      const results = await fetch(`${import.meta.env['VITE_API_URL']}/documents/review`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(r => r.json())

      setDocumentsToReview(results)
    }

    f();
  }, [accessToken])

  return (
    <AuthLayout>
      <main>
        Documents
        {
          documentsToReview.map(document => (
            <Document key={document.accountId} document={document} />
          ))
        }
      </main>
    </AuthLayout>
  )
}
