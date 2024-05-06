const CommunityStandardPage = () => {
  return (
    <div className="container pt-10" style={{ width: '60%' }}>
      <h1 className="font-semibold text-3xl mb-3 text-center">
        Tiêu chuẩn cộng đồng
      </h1>
      {/* <p className="text-text3 mb-4">Ngày đăng: 20/10/2011</p> */}
      <p className="text-text3 text-justify">
        Otlichno hy vọng sẽ tạo ra một môi trường an toàn, tích cực và hỗ trợ cho
        học viên, giáo viên và phụ huynh. Nó không chỉ đảm bảo tính chính xác và
        độ tin cậy của nội dung giáo dục mà còn thúc đẩy sự tương tác và hợp tác
        hiệu quả giữa các thành viên. Bên cạnh đó, tiêu chuẩn cộng đồng còn nâng
        cao trải nghiệm người dùng và hỗ trợ tuân thủ pháp lý, giải quyết khiếu nại
        một cách công bằng, qua đó xây dựng một ứng dụng học tập bền vững và đáng tin
        cậy.
      </p>
      <ul className="mt-5 text-justify">
        <li>
          <h2 className="font-semibold text-xl">
            1. Quy định đăng ký giáo viên
          </h2>
          <p className="mb-5">
            Với mục đích đảm bảo rằng mọi giáo viên đăng ký trên ứng dụng phải đáp
            ứng các tiêu chuẩn nghiệp vụ và đạo đức nghề nghiệp cao nhất.
          </p>
          <ul className="list-disc ml-9">
            <li><strong>Điều kiện Đăng Ký: </strong> Người dùng muốn đăng ký làm giáo
              viên cần cung cấp thông tin cá nhân đầy đủ và phải tải lên chứng chỉ hành
              nghề hợp lệ.</li>
            <li><strong>Quy trình Xét Duyệt: </strong>Sau khi đăng ký, tài khoản của
              giáo viên sẽ được gửi cho quản trị viên (ADMIN) để xét duyệt. Giáo viên
              sẽ nhận được email thông báo về trạng thái đăng ký và cần chờ phê duyệt.
            </li>
            <li><strong>Trách Nhiệm: </strong>Giáo viên cần tuân thủ các quy định của
              nền tảng trong quá trình giảng dạy và không được vi phạm các nguyên tắc
              đạo đức nghề nghiệp.</li>
          </ul>
        </li>
      </ul>
      <ul className="mt-5 text-justify">
        <li>
          <h2 className="font-semibold text-xl">
            2. Đăng Tải Khóa Học
          </h2>
          <ul className="list-disc ml-9">
            <li><strong>Quyền Đăng Tải: </strong>Chỉ giáo viên đã được phê duyệt mới có quyền đăng tải khóa học lên nền tảng.</li>
            <li><strong>Nội Dung Khóa Học: </strong>Nội dung khóa học cần rõ ràng, có cấu trúc và không chứa thông tin sai lệch hoặc bất kỳ nội dung bất hợp pháp nào.
            </li>
            <li><strong>Phê Duyệt Khóa Học: </strong>Mọi khóa học đều phải được ADMIN xét duyệt trước khi được công khai.</li>
          </ul>
        </li>
      </ul>
      <ul className="mt-5 text-justify">
        <li>
          <h2 className="font-semibold text-xl">
            3. Trao đổi bài Học
          </h2>
          <p className="mb-5">
            Bình luận phải mang tính xây dựng, liên quan trực tiếp đến nội dung bài học và tạo môi trường học tập tích cực.
          </p>
          <ul className="list-disc ml-9">
            <li><strong>Ngôn Từ: </strong>Tránh sử dụng ngôn từ thô tục, xúc phạm hoặc kỳ thị. Bình luận không được chứa quảng cáo hoặc spam.</li>
            <li><strong>Quản Lý Bình Luận: </strong>Giáo viên và ADMIN có quyền xóa bình luận không phù hợp hoặc vi phạm tiêu chuẩn của nền tảng.
            </li>
          </ul>
        </li>
      </ul>
      <ul className="mt-5 text-justify">
        <li>
          <h2 className="font-semibold text-xl">
            4. Đánh Giá Khóa Học
          </h2>
          <p className="mb-5">
            Đánh giá khóa học nhằm mục đích đánh giá chất lượng và hiệu quả của khóa học, từ đó cung cấp thông tin phản hồi cho giáo viên và quản trị viên để cải thiện trải nghiệm học tập cho học viên và nâng cao chất lượng của khóa học trong tương lai.
          </p>
          <ul className="list-disc ml-9">
            <li><strong>Điều Kiện Đánh Giá: </strong>Chỉ học viên đã hoàn thành khóa học mới có quyền đánh giá khóa học.</li>
            <li><strong>Thang Điểm: </strong>Đánh giá phải được thực hiện một cách công bằng và khách quan.
            </li>
            <li><strong>Nội dung đánh giá: </strong>Đánh giá không được chứa ngôn từ xúc phạm, miệt thị và phải liên quan đến chất lượng nội dung và cách thức giảng dạy của khóa học.</li>
          </ul>
        </li>
      </ul>
      <ul className="mt-5 text-justify">
        <li>
          <h2 className="font-semibold text-xl">
            5. Khóa tài khoản của người dùng.
          </h2>
          <ul className="list-disc ml-9">
            <li className="mb-1">
              Admin có quyền block các tài khoản khác nếu phát hiện vi phạm tiêu chuẩn cộng đồng.
            </li>
            <li className="mb-1">
              Việc này nhằm bảo vệ môi trường học tập trực tuyến, đảm bảo rằng các người dùng tuân thủ quy định và không gây ra bất kỳ vấn đề nào cho cộng đồng.
            </li>
            <li className="mb-1">
              Khi một tài khoản bị block, người dùng sẽ mất quyền truy cập vào các chức năng và nội dung của ứng dụng, và chỉ có thể khôi phục tài khoản sau khi đã giải quyết vấn đề và được phê duyệt lại bởi ADMIN.
            </li>
            <li className="mb-1">
              Quyền block tài khoản là một biện pháp quan trọng để duy trì sự an toàn và tính chất chuyên nghiệp của nền tảng học tập.
            </li>
          </ul>
          {/* <img
            className="w-5/6 h-auto mx-auto mb-5"
            src="https://images.unsplash.com/photo-1714786479680-d0c30f22dd29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          /> */}
        </li>
      </ul>
      <ul className="mt-5 text-justify">
        <p>Với các quy định về tiêu chuẩn cộng đồng, chúng tôi mong rằng Otlichno sẽ tiếp tục phát triển và trở thành một ứng dụng học tập trực tuyến hàng đầu, nơi mà mọi người có thể trải nghiệm một môi trường học tập an toàn, chuyên nghiệp và tích cực. Chúng tôi cam kết duy trì và thúc đẩy các giá trị như tôn trọng, công bằng và đa dạng trong cộng đồng học tập của chúng tôi. Bằng cách cung cấp các tiêu chuẩn cộng đồng rõ ràng và thực hiện các biện pháp kiểm soát chặt chẽ, chúng tôi hy vọng sẽ tạo ra một môi trường học tập mà tất cả mọi người đều cảm thấy an tâm và có thể phát triển hết tiềm năng của mình. Chúng tôi luôn lắng nghe phản hồi từ người dùng và sẵn lòng cải tiến để mang lại trải nghiệm tốt nhất cho mọi thành viên trong cộng đồng Otlichno.</p>
      </ul>
    </div>
  );
};

export default CommunityStandardPage;
