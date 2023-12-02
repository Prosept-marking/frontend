import Preloader from '../../components/Preloader';
import { DealerCard } from '../../components/DealerCard';
import { ProductCard } from '../../components/ProductCard';

export default function Statistics() {
  return (
    <>
      <DealerCard />
      <ProductCard />
      <Preloader />
    </>
  );
}
