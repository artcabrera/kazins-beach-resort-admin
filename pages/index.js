const Home = () => {
  return <></>;
};

export default Home;

export const getStaticProps = (context) => {
  return {
    redirect: {
      permanent: true,
      destination: "/booking-inquiries",
    },
  };
};
