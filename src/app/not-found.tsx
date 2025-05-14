import Footer from "@/app/conponents/Footer";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col bg-[#FFFBF4] text-gray-800">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium pr-5 mr-6 border-r border-black">
            404
          </h1>
          <p className="text-sm">This page could not be found.</p>
        </div>
      </div>
      <Footer pathName="" />
    </section>
  );
}
