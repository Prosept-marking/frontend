import Preloader from '../../components/Preloader';
import { ProductCard } from '../../components/ProductCard';
import { ResultBox } from '../../components/ResultBox';

export default function Statistics() {
  return (
    <>
      <ResultBox result={true} />
      <ProductCard />
      <Preloader />
    </>
  );
}
