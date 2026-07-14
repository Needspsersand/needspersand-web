import Hero from "../../components/sections/Hero";
import SectionGovernance from "./_components/SectionGovernance";
import SectionOperate from "./_components/SectionOperate";
import SectionTimeline from "./_components/SectionTimeline";
import SectionVision from "./_components/SectionVision";
import UpdatesSection from "./_components/UpdatesSection";
import ScrollToHash from "./_components/ScrollToHash";

/** 뉴스가 자주 바뀌지 않으므로 정적 캐시 (1시간마다 재생성) */
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="-mt-20">
      <ScrollToHash />
      <Hero />
      <SectionOperate />
      <SectionVision />
      <SectionGovernance />
      <UpdatesSection />
      <SectionTimeline />
    </main>
  );
}
