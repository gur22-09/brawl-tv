import { createViewerToken } from '@/server-actions/token';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

export const useViewerToken = (hostIdentity: string) => {
  const [viewer, setViewer] = useState<{
    token: string;
    name: string;
    identity: string;
  }>({
    name: '',
    identity: '',
    token: '',
  });

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setViewer((v) => ({ ...v, token: viewerToken }));

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        if (decodedToken?.jti) {
          setViewer((v) => ({ ...v, identity: decodedToken.jti as string }));
        }

        if (decodedToken?.name) {
          setViewer((v) => ({ ...v, name: decodedToken.name as string }));
        }
      } catch {
        toast.error('Oops, something went wrong');
      }
    };

    createToken();
  }, [hostIdentity]);

  return viewer;
};
