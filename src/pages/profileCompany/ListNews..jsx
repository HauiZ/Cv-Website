import React from 'react'

export default function ListNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadnews = async () => {
      const data = await fetchnews();
      // Limit to only the first 9 news
      setNews(data.slice(0, 9));
    };
    loadnews();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {news.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </div>
  );
  
}
