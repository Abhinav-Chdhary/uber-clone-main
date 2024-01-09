import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";

function Search() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [searchPickUp, setSearchPickUp] = useState("");
  const [searchDropOff, setSearchDropOff] = useState("");
  const [autocompletePickUp, setAutocompletePickUp] = useState([]);
  const [autocompleteDropOff, setAutocompleteDropOff] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_PlacesAPI_Key,
      "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const loadAutocomplete = async () => {
      try {
        const url = `https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=${searchPickUp}&radius=500`;
        const response = await fetch(url, options);
        const result = await response.json();
        const queries = result.predictions.map((item) => item.description);
        setAutocompletePickUp(queries);
      } catch (error) {
        console.error(error);
      }
    };
    if (searchPickUp.length > 0) loadAutocomplete();
    else setAutocompletePickUp([]);
  }, [searchPickUp]);
  useEffect(() => {
    const loadAutocomplete = async () => {
      try {
        const url = `https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=${searchDropOff}&radius=500`;
        const response = await fetch(url, options);
        const result = await response.json();
        const queries = result.predictions.map((item) => item.description);
        setAutocompleteDropOff(queries);
      } catch (error) {
        console.error(error);
      }
    };
    if (searchDropOff.length > 0) loadAutocomplete();
    else setAutocompleteDropOff([]);
  }, [searchDropOff]);
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
        </FromToIcons>

        <InputBoxes>
          <ContainerBox>
            <Input
              placeholder="Enter pickup location"
              value={searchPickUp}
              onChange={(e) => setSearchPickUp(e.target.value)}
            />
            {autocompletePickUp.length > 0 && pickup.length < 1 && (
              <SuggestionsList>
                {autocompletePickUp.map((item, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => {
                      setPickup(item);
                      setSearchPickUp(item);
                    }}
                  >
                    {item}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
          </ContainerBox>
          <ContainerBox>
            <Input
              placeholder="Where to?"
              value={searchDropOff}
              onChange={(e) => setSearchDropOff(e.target.value)}
            />
            {autocompleteDropOff.length > 0 && dropoff.length < 1 && (
              <SuggestionsList>
                {autocompleteDropOff.map((item, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => {
                      setDropoff(item);
                      setSearchDropOff(item);
                    }}
                  >
                    {item}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
          </ContainerBox>
        </InputBoxes>

        <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
      </InputContainer>

      <SavedPlaces>
        <StartIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        <Link href="/NotAvailable">Saved Images</Link>
      </SavedPlaces>

      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: pickup,
            dropoff: dropoff,
          },
        }}
      >
        <ConfirmContainer>
          <ConfirmButton>Confirm Locations</ConfirmButton>
        </ConfirmContainer>
      </Link>
    </Wrapper>
  );
}

export default Search;

const Wrapper = tw.div`
    bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
    bg-white px-4
`;

const BackButton = tw.img`
    h-12 cursor-pointer transform transition hover:scale-110
`;

const FromToIcons = tw.div`
    w-10 flex flex-col mr-2 items-center
`;

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2
`;

const Circle = tw.img`
    h-2.5
`;

const Line = tw.img`
    h-10
`;

const Square = tw.img`
    h-3
`;

const InputBoxes = tw.div`
    flex flex-col flex-1
`;

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none ml-3 relative
`;

const PlusIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3
`;

const SavedPlaces = tw.div`
    flex items-center bg-white px-4 py-2
`;

const StartIcon = tw.img`
    bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`;

const ConfirmContainer = tw.div`
    bg-black text-white text-center mt-2 mx-4 px-4 py-3 text-2xl cursor-pointer transition hover:bg-gray-800
`;

const ConfirmButton = tw.div`
    text-white transform transition hover:scale-105
`;
const SuggestionsList = tw.ul`
  absolute w-2/3 mt-12 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden z-10
`;

const SuggestionItem = tw.li`
  px-4 py-2 cursor-pointer hover:bg-gray-100
`;
const ContainerBox = tw.div`
flex flex-col`;
