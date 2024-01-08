import React from "react";
import tw from "tailwind-styled-components"; // Import tailwind-styled-components
import Link from "next/link";

const NotAvailable = () => {
  return (
    <Wrapper>
      <BackButtonContainer>
        <Link href="/">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </BackButtonContainer>
      <Content>
        <Programmer
          src="https://i.ibb.co/GRMg6Fn/workingonit.png"
          alt="Programmer working"
        />
        <NotAvailableText>I'm Working On it</NotAvailableText>
      </Content>
    </Wrapper>
  );
};

export default NotAvailable;

const Wrapper = tw.div`
  flex items-center justify-center h-screen bg-gray-200
`;

const Content = tw.div`
  text-center
`;

const Programmer = tw.img`
  h-20 mb-4 mx-auto
`;

const NotAvailableText = tw.h1`
  text-3xl font-bold text-gray-800 mb-4
`;
const BackButtonContainer = tw.div`
    absolute rounded-full top-4 left-4 z-10 bg-white shadow-md cursor-pointer transform transition hover:scale-110
`;

const BackButton = tw.img`
    h-full object-contain 
`;
