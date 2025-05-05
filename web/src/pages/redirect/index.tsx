import { useEffect, useRef, useState } from "react";
import { LogoIcon } from "@/assets";
import { Text } from "@/components";
import { useLinkQueries } from "@/queries/links";

import { useNavigate, useParams } from "react-router";

export default function Redirect() {
  const { getLinkMutation } = useLinkQueries();
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  const [originalUrl, setOriginalUrl] = useState("/");

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        if (!shortUrl || hasFetched.current) return;
        hasFetched.current = true;
        const { originalUrl } = await getLinkMutation(shortUrl);

        setOriginalUrl(originalUrl);

        window.location.href = originalUrl;
      } catch (error) {
        console.log(error);
        navigate("/not-found");
      }
    };

    fetchLink();
  }, [getLinkMutation, shortUrl, navigate]);

  return (
    <div className="h-screen flex justify-center max-w-[500px] items-center m-auto p-2">
      <div className="bg-white px-12 py-16 rounded-lg flex flex-col items-center gap-6">
        <LogoIcon />
        <Text size="xl" className="text-gray-600">
          Redirecionando...
        </Text>
        <Text className="text-gray-500 text-center">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado? {""}
          <a href={originalUrl} className="text-blue-base font-bold">
            Acesse aqui
          </a>
        </Text>
      </div>
    </div>
  );
}
