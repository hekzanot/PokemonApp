import { Datatable } from '../../components/Datatable/Datatable';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { Container, Grid, GridCol } from '@mantine/core';

export default async function HomePage() {
  return (
    <>
      <Container mih={'100%'} fluid>
        <Datatable />
        <ColorSchemeToggle />
      </Container>
    </>
  );
}
