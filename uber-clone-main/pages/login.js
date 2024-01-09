import { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import tw from "tailwind-styled-components/dist/tailwind";

function Login() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <Wrapper>
      <UberLogo src="https://i.ibb.co/ZMhy8ws/uber-logo.png" />
      <Title>Login to access your account</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={handleSignIn}>Sign in with Google</SignInButton>
    </Wrapper>
  );
}

export default Login;

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`;

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full text-xl transition hover:bg-gray-800 hover:text-xl
`;

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`;
const Title = tw.div`
    text-5xl pt-4 text-gray-500
`;

const HeadImage = tw.img`
    object-contain w-full
`;
