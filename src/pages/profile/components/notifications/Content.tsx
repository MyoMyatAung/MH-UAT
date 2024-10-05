const Content = ({ notice }: any) => {
  if (!notice) return null;

  return (
    <div className="content p-3">
      <div className="text-card">
        <h3>{notice.title}</h3>
        <p className="mt-3">{notice.content}</p>
        {notice.extend.page_name && (
          <button
            className="noti-btn mt-6"
            onClick={() => window.open(notice.extend.page_path, "_blank")}
          >
            {notice.extend.page_name}
          </button>
        )}
      </div>
    </div>
  );
};

export default Content;
