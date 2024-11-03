import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = () => {
  const [isInViewports, setIsInViewports] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target);
          if (entry.isIntersecting && index !== -1 && !isInViewports[index]) {
            // 요소가 처음 화면에 들어왔을 때만 true로 설정
            setIsInViewports((prev) => {
              const newInViewports = [...prev];
              newInViewports[index] = true;
              return newInViewports;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [isInViewports]);

  const addRef = (ref) => {
    if (ref && !refs.current.includes(ref)) {
      refs.current.push(ref);
      setIsInViewports((prev) => [...prev, false]); // 초기값으로 false 추가
    }
  };

  return { refs: refs.current, addRef, isInViewports };
};

export default useIntersectionObserver;
