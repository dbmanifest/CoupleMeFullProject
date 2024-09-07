"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { useAuth } from "@clerk/nextjs";
import { BeatLoader } from "react-spinners";

const LibraryPage = () => {
  const { userId } = useAuth();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      if (userId) {
        try {
          const response = await fetch("/api/library");
          const data = await response.json();
          setImages(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };

    fetchImages();
  }, [userId]);

  // console.log(images);

  return (
    <div>
      {loading ? (
        <BeatLoader color="white" size={5} />
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full bg-popover md:h-fit min-h-[calc(90dvh)] md:min-h-[90vh] rounded-3xl p-3 md:p-6 mb-6">
          <div className="w-fit h-fit flex flex-col items-center justify-center">
            <Image
              width={125}
              height={95}
              src="/img/library_empty.svg"
              alt="Library empty"
            />
            <p className="mt-8 md:mt-12 text-muted-foreground">
              You don&apos;t have any pictures in your library yet
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-popover md:h-fit min-h-[calc(90dvh)] md:min-h-[90vh] rounded-3xl p-3 md:p-6 mb-6">
          <h1 className="text-6xl mb-6 text-muted-foreground">Gallery</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full bg-popover md:h-fit min-h-[calc(90dvh)] md:min-h-[90vh] rounded-3xl p-3 md:p-6 mb-6">
          <div key="1">
                <Image
                  width={400}
                  height={200}
                  src="https://dummyimage.com/200x300/766/fff.png"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div key="2">
              <Image
                width={400}
                height={200}
                src="https://dummyimage.com/200x300/766/fff.png"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div key="3">
              <Image
                width={400}
                height={200}
                src="https://dummyimage.com/200x300/766/fff.png"
                alt=""
                className="rounded-lg"
              />
            </div>
            {/* {images.map((image, index) => (
              <div key={index}>
                <Image
                  width={300}
                  height={200}
                  src={`data:image/png;base64,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nsBSUn2RAiHNHVwEEEAgDoGlpHr2AiHN4xwaK0EAAQT2BJaQ6lkLhDR3WBFAAIG4BHJL9awFQprHPThWhgACCCQCOaV6tgIhzR1OBBBAoA4CuaR6lgIhzes4NFaJAAIIJAK5pPrsAiHNHUgEEECgPgI5pPqsAiHN6zs0VowAAgjsCcyV6rMKhDR3EBFAAIG6CcyR6pMLhDSv+9BYPQIIILAnMFWqTyoQ0tzBQwABBNohMFWqjy4Q0rydQ2MnCCCAwJ7AFKk+qkBIc4cNAQQQaJfAWKk+qkBI83YPjp0hgAACicAYqT64QEhzhwsBBBDYBoGhUn1QgZDm2zg0dokAAggkAkOlem+BkOYOFAIIILAMgb/+9a/dPe5xj+7Rj3509773vW83yTXXXNM9//nP777xjW90x48f75773Od2b33rW7tjx451//vf/7pXv/rV3Uc/+tHuP//5T/fwhz+8+9CHPtTd7na3O3KBafyvfe1r3f/93/+due7d735397znPe/QMW91q1t1V155ZffNb36ze9vb3rZb193udrfugx/8YHeve91rN86RBUKaL3NojIoAAggkAs9+9rO7b3/7290jHvGIMwXypCc9qUvfvN/73vd2f/nLX7qHPexh3ctf/vLdN/v3vOc93Qc+8IHuq1/9aneb29yme85zntNdcMEF3cc+9rEjgT7oQQ/qXvrSl3ZPfvKTz7vuqDG/+93vdo985CO7L33pS10aI137jne8o0tK42Y3u9nRBUKaO+QIIIDAMgTSN+W3vOUt3aMe9ajdN+L0DuQf//hHd9vb3rb7zW9+093lLnfZTZz+F/8nPvGJ3TuS9E38RS96Uff0pz9999qvfvWr7rLLLuvSO5lUJre+9a13xZO+nvnMZ+7ecXzkIx/p7n73u3fvfOc7d2Vw7tdRY77xjW/sfvvb33avec1rdvOkr7Suj3/8491DHvKQwwuENF/m0BgVAQQQ+POf/9zd97737b785S93n/nMZ7rf/e53uwL5+c9/viuJpA72X+kdyhOf+MTuD3/4Q3f7299+96Oo+9znPruXT58+vfsxV7rvzne+c3fPe96z+/SnP93961//2r27Sf99KpWLL764u//977/7z+nHYI9//ON3Pxa7xS1uceSYr3vd63bredrTntZde+213SWXXLL7sVlaTyqyA3+ERZo74AgggMByBNI7iHvf+97dy172su7Nb37zmQL5zne+0z3ucY/r/vSnP52Z/Ec/+tHuf+3//e9/725+85t3P/7xj3fvKPZfJ06c2L07SYX0la98pXvVq1618yPpx03px1/pK32zT6+nedPYT3jCE7oHP/jBux9HHTVmKpC0nuRkkg9Jc73gBS/YrecVr3jF+QVCmi93aIyMAAIIfP7zn9/9OCl9008/Yjq7QC6//PLdu4vkn/dfX//613ff+NP/sL/ooou6L3zhC90DH/jA3cv//e9/d+9AfvGLX3SnTp3a/XdJyicv8rOf/exQ2J/97Ge7V77yld2vf/3rI8d87Wtfu1tP+r/7f5n1rGc9a/fjsRe+8IU3LRDS3OFGAAEEliXwlKc8pfvWt761+8afvpK/SEVwv/vdr/viF7+4cyCpSC699NLd6+9617t2Ejv96Cq9a3jGM56xexeQvn7605/ufsSUfiSWxnv/+99/5kdY6Rt9eufwz3/+s/ve977XPfShDz2zsU9+8pPdG97whl3xHDXmm970pl3JJAezX2v6MdbnPve53Xg3+REWab7swTE6AgggcC6Bs9+BpNeSb0ie4sMf/vDux03JOaRrnvrUp+7+BVZ695LKJP0rrPTOJLmPVBxJvD/gAQ/o0o/Bkq9IxfCDH/ygu9Od7tTd9a537V7/+td3L37xi3ff9B/zmMfs/ulwGveoMVPBJHeSCiyN/fa3v30n5ZO3Sf+U90yBpJ+vpa9964kZAQQQQGB5AucWSHo3kf7JbiqJJLlf8pKXdMlFpK8kzdP/n77pJ8/x2Mc+diffb3nLW+7eESQ5nrxK+kr/gir9+Cv9qOz73//+7r9PhZA8Riqj9HryH4eNeeGFF+7G+dSnPrX7V1hJ4idvkz53ksR8Kqn0rufYFVdccTp9SEV5LH9YzIAAAgjUTmDvQ1L5HPvhD394+o53vONOvPhCAAEEEECgj8B11123+6Dj/wNQP+8Iu6U3vAAAAABJRU5ErkJggg==`}
                  alt={image.alt || `Image ${index + 1}`}
                  className="rounded-lg"
                />
              </div>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
