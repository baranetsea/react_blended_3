import { Container, CountryInfo, Section } from 'components';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { countryId } = useParams();
  const location = useLocation();

  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const asyncWarapper = async () => {
      try {
        setLoading(true);
        setError(null);
        const requestData = await fetchCountry(countryId);
        setCountry(requestData);
        // console.log(requestData);
      } catch {
        setError(' Sorry, there no such request results!!!');
      } finally {
        setLoading(false);
      }
    };
    asyncWarapper();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <Link to={backLink.current}>Go back.</Link>
        {country && <CountryInfo data={country} />}
      </Container>
    </Section>
  );
};
