import Dashboard from "@/components/admin/dashboard/dashboard";
import { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const defaultImage =
    "https://media.licdn.com/dms/image/v2/D5612AQE8NiooxTxA3w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1695825196046?e=2147483647&v=beta&t=2zU71mKLxGihkNQB5eMDjCgbD7srasN1gyEqowXMGV4";

  // const [sliderImages, setSliderImages] = useState<string[]>([defaultImage]);
  // const [donationAmount, setDonationAmount] = useState<number>(5000);
  // const [certificates, setCertificates] = useState<string[]>([defaultImage]);
  // const [selectedTopic, setSelectedTopic] = useState<string>("Topic A");

  // const handleAddSliderImage = (file: File) => {
  //   const newImage = URL.createObjectURL(file);
  //   setSliderImages([...sliderImages, newImage]);
  // };

  // const handleDeleteSliderImage = (index: number) => {
  //   setSliderImages(sliderImages.filter((_, i) => i !== index));
  // };

  // const handleAddCertificate = (file: File) => {
  //   const newCertificate = URL.createObjectURL(file);
  //   setCertificates([...certificates, newCertificate]);
  // };

  // const handleDeleteCertificate = (index: number) => {
  //   setCertificates(certificates.filter((_, i) => i !== index));
  // };

  return (
    <>
      <Dashboard />
      <Toaster />
    </>
  );
}
