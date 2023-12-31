export default function CardVideo({ keyVideo, title }: any) {
  return (
    <>
      <iframe
        className="rounded-lg w-[20rem] h-[10rem] m-1"
        src={`https://www.youtube.com/embed/${keyVideo}`}
        frameBorder="0"
        allowFullScreen
        title={title}
      ></iframe>
    </>
  );
}
