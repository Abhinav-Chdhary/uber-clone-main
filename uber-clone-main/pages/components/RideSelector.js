import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../data/carList";

function RideSelector({ pickupCoordinates, dropoffCoordinates }) {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]}, ${pickupCoordinates[1]};${dropoffCoordinates[0]}, ${dropoffCoordinates[1]}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );

        const data = await response.json();

        if (data.routes && data.routes[0] && data.routes[0].duration) {
          //console.log(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
          setRideDuration(data.routes[0].duration / 60);
        } else console.log("fetching...");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <div className="flex items-center">
        <span className="mr-2">Estimated ride time:</span>
        <Time>
          {rideDuration
            ? `${Math.floor(rideDuration / 60)} hour ${Math.floor(
                rideDuration % 60
              )} min`
            : ""}
        </Time>
      </div>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <Price>₹ {(rideDuration * car.multiplier * 33).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
}

export default RideSelector;

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`;
const CarList = tw.div`
    overflow-y-scroll
`;

const Car = tw.div`
    flex p-4 items-center
`;

const CarImage = tw.img`
    h-14 mr-4
`;

const CarDetails = tw.div`
    flex-1
`;

const Service = tw.div`
    font-medium
`;

const Time = tw.div`
    text-xs text-blue-500
`;

const Price = tw.div`
    text-sm
`;
