export const TestTab = () => {
  return (
    <div>
      <ul className="space-y-4 text-lg">
        <li>
          <p className="font-semibold">
            Câu 1: Lorem ipsum dolor sit amet consectetur adipisicing elit?
          </p>
          <ul>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-medium">
            Câu 2: Lorem ipsum dolor sit amet consectetur adipisicing elit?
          </p>
          <ul>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="radio" name="q1" value={0} />
              <span>Lorem, ipsum dolor.</span>
            </li>
          </ul>
        </li>
      </ul>
      <button className="mt-5 rounded-lg bg-secondary20 px-5 py-2 font-medium text-white">Nộp bài</button>
    </div>
  );
};
