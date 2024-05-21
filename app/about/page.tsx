import React from "react";
import HeaderNav from "@/app/components/HeaderNav";
import Footer from "@/app/components/Footer";

const page = () => {
  return (
    <section>
      <HeaderNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium mb-4 text-center mt-10">
          Chào mừng bạn đến với nền tảng học trực tuyến 
          <span className="text-green-800 italic font-serif"> Dream</span> <span className="text-blue-900 italic font-serif">Courses</span> của chúng tôi
        </h1>
        <p className="text-gray-700 mb-4 text-justify">
          Các khóa học trực tuyến của chúng tôi được thiết kế để giúp bạn học kỹ
          năng mới và đạt được mục tiêu của mình. Chúng tôi cung cấp một loạt
          các khóa học trong chủ đề Công nghệ thông tin, được dạy bởi các
          giảng viên có kinh nghiệm. Các khóa học của chúng tôi linh hoạt, dễ
          tiếp cận và thực hành, giúp bạn có thể học theo tốc độ và lịch trình
          của riêng mình.
        </p>
        <div className="flex flex-wrap -mx-4" style={{ display: 'flex', alignItems: 'stretch' }}>
          <div className="w-full md:w-1/3 px-4 mb-7">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-1 text-center">Học linh hoạt</h2>
              <p className="text-gray-700 mb-1">
                Các khóa học của chúng tôi được thiết kế linh hoạt, giúp bạn có
                thể học theo tốc độ và lịch trình của riêng mình. Bạn có thể
                truy cập các khóa học của chúng tôi từ bất kỳ thiết bị nào, vào
                bất kỳ lúc nào.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Học theo tốc độ của bạn</li>
                <li>Học theo lịch trình của bạn</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-center">Học tiếp cận</h2>
              <p className="text-gray-700 mb-4">
                Các khóa học của chúng tôi có thể tiếp cận vào bất kỳ lúc nào.
                Bạn có thể học từ bất kỳ đâu, miễn là bạn có kết nối internet.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Tiếp cận 24/7</li>
                <li>Học từ bất kỳ đâu</li>
                <li>Truy cập các khóa học từ bất kỳ thiết bị nào</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-center">Học thực hành</h2>
              <p className="text-gray-700 mb-4">
                Các khóa học của chúng tôi được thiết kế để thực hành, giúp bạn
                có thể học bằng cách thực hành. Mỗi khóa học bao gồm bài giảng
                video, bài tập để giúp bạn làm chủ nội dung.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Bài giảng video</li>
                <li>Học bằng thông qua bài tập</li>
              </ul>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Các Giảng viên của chúng tôi
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Các giảng viên của chúng tôi là những chuyên gia có kinh nghiệm với
          niềm đam mê dạy học. Họ mang đến kinh nghiệm thực tế và chuyên môn của
          mình vào lớp học, giúp bạn học từ những người xuất sắc nhất. Các giảng
          viên của chúng tôi sẵn lòng trả lời câu hỏi và cung cấp phản hồi, giúp
          bạn tận dụng tối đa trải nghiệm học tập của mình.
        </p>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Giảng viên 1</h2>
              <p className="text-gray-700 mb-4">
                Giảng viên 1 là một giảng viên có kinh nghiệm với niềm đam mê
                dạy học. Họ mang đến kinh nghiệm thực tế và chuyên môn của mình
                vào lớp học, giúp bạn học từ những người xuất sắc nhất.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Giảng viên có kinh nghiệm</li>
                <li>Đam mê dạy học</li>
                <li>Kinh nghiệm thực tế và chuyên môn</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Giảng viên 2</h2>
              <p className="text-gray-700 mb-4">
                Giảng viên 2 là một giảng viên có kinh nghiệm với niềm đam mê
                dạy học. Họ mang đến kinh nghiệm thực tế và chuyên môn của mình
                vào lớp học, giúp bạn học từ những người xuất sắc nhất.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Giảng viên có kinh nghiệm</li>
                <li>Đam mê dạy học</li>
                <li>Kinh nghiệm thực tế và chuyên môn</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Giảng viên 3</h2>
              <p className="text-gray-700 mb-4">
                Giảng viên 3 là một giảng viên có kinh nghiệm với niềm đam mê
                dạy học. Họ mang đến kinh nghiệm thực tế và chuyên môn của mình
                vào lớp học, giúp bạn học từ những người xuất sắc nhất.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Giảng viên có kinh nghiệm</li>
                <li>Đam mê dạy học</li>
                <li>Kinh nghiệm thực tế và chuyên môn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default page;