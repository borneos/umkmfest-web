import Image from 'next/image';
import PropTypes from 'prop-types';

export default function CardBlog(props) {
  const { title, image, link, data } = props;
  console.log('🚀 ~ file: CardBlog.jsx:9 ~ CardBlog ~ props:', props);
  console.log('🚀 ~ file: CardBlog.jsx:8 ~ CardBlog ~ data:', data);

  return (
    <>
      <div className="shadow-md rounded-xl my-4 w-[348px] h-[230]">
        <div className="flex flex-col gap-2 p-1">
          <Image
            alt="blog1"
            width={338}
            height={122}
            // src={populateAdditionalImage({
            //   ...parse(data.imageAdditional),
            //   height: 338,
            //   width: 122,
            //   extension: 'webp',
            // })}
            src={data.image}
          />
          <p className="font-semibold text-base text-black">{data?.name}</p>
          <p className="text-xs text-gray-400">14 jam yang lalu</p>
        </div>
      </div>
    </>
  );
}

CardBlog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  data: PropTypes.object,
};
