import MemberCard from "@/components/admin/member/MemberCard";
import Logo from '@/public/images/blue_csr_logo.png'

export default function Page() {
  return (
    <main className="text-center margin-auto h-screen relative">
      <h1 className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MemberCard 
          photo={Logo.src}
          name="John Doe"
          dateRange="2022 - Present"
        />
      </h1>
    </main>
  );
}
