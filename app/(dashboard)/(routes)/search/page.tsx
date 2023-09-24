import { db } from '@/lib/db';
import Categories from './_components/categories';

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <div className='p-6'>
      <Categories items={categories}/>
      {/* {categories.map((category) => {
        return <div key={category.id}>{category.name}</div>;
      })}  */}
    </div>
  );
};

export default SearchPage;
