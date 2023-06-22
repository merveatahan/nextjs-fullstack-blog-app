import Link from "next/link";

export default function BlogCard({ data }) {
  return (
    <div className="flex ">
      {data.map((item) => {
        console.log(item);
        return (
          <Link href={`blogDetail/${item._id}`}>
            <div className="h-64 w-48 mx-2">
              <div>
                <h3>{item.title}</h3>
              </div>
              <div>
                <h4>{item.description}</h4>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
