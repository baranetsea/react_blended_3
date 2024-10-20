import { Container, Heading, SearchForm, Section } from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('query');

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) return;
    const asyncWarapper = async () => {
      try {
        setLoading(true);
        setError(null);
        const requestData = await fetchByRegion(region);
        setCountries(requestData);
        // console.log(requestData);
      } catch {
        setError(' Sorry, there no such request results!!!');
      } finally {
        setLoading(false);
      }
    };
    asyncWarapper();
  }, [region]);

  const onSubmit = query => {
    setSearchParams({ query });

    // console.log(query);
  };
  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        <SearchForm onSubmit={onSubmit} />
        {loading && <div>...Loading!</div>}
        {error && <div>{error}</div>}
      </Container>
    </Section>
  );
};
