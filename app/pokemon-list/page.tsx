import { Datatable } from '../../components/Datatable/Datatable';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';

export default async function HomePage() {
  return (
    <>
      <Datatable />
      <ColorSchemeToggle />
    </>
  );
}
