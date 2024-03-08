import { Carousel } from "flowbite-react";

function App() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        slide={true}
        leftControl=" "
        rightControl=" "
        indicators={false}
      >
        <img
          src="https://th.bing.com/th/id/R.1642a35570ecbdbc6db39c1c9d2e9342?rik=%2byoBuiKAzCzVbA&riu=http%3a%2f%2fwww.worqambatour.com%2fimg%2fslider_single_tour%2flake+tana+worqamba9.jpg&ehk=dopbeq8p8PSp6lui8%2frzVFig2qIOHU8ksjPK3dsFpy4%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
        <img
          src="https://th.bing.com/th/id/OIP.MIwVG9MOgTr3jBTmrG5t9wHaEK?w=2880&h=1620&rs=1&pid=ImgDetMain"
          alt=""
        />
        <img
          src="https://i2.wp.com/thirdeyemom.com/wp-content/uploads/2014/07/p1040635-1.jpg"
          alt=""
        />
        <img
          src="https://th.bing.com/th/id/R.8542727224bf448faf24e9d4fb720eea?rik=tebzsBmG%2b3gi8g&riu=http%3a%2f%2fwww.nationalparks-worldwide.com%2feaf%2fethiopia%2flake-tana%2flake-tana-wetlands.jpg&ehk=wsEoduGIXwSK46K6ikBBbvtlo5qQLMVUkUhxTPoG%2byo%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
        <img
          src="https://image.jimcdn.com/app/cms/image/transf/dimension=4000x3000:format=jpg/path/sf63e18bc5d0da0ad/image/ibaea1a7d825e2fc6/version/1546169445/image.jpg"
          alt=""
        />
        <img
          src="https://cdn.britannica.com/40/141140-050-6E62934F/Lake-Tana-Ethiopia.jpg"
          alt=""
        />
      </Carousel>
    </div>
  );
}

export default App;
