const DocumentTab = () => {
  return (
    <div className="text-lg">
      <div className="">
        <span>Tài liệu 1: </span>
        <span className="underline decoration-secondary text-secondary">
          http://localhost:5173/course/:courseId/lesson/:lessonSlug
        </span>
      </div>
      <div className="">
        <span>Tài liệu 2: </span>
        <span className="underline decoration-secondary text-secondary">
          http://localhost:5173/course/:courseId/lesson/:lessonSlug
        </span>
      </div>
    </div>
  );
};

export default DocumentTab;
