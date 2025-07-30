import Link from "next/link";
import ArrowRightIcon from "@/components/svg/ArrowRightIconSvg";
import Image from "next/image";

const CARD_TEXTS = [
  "흩어진 간식 구매처를 통합하고,\n기수별 지출을 똑똑하게 관리하세요.",
  "관리자와 유저\n모두 이용할 수 있어요.",
  "다양한 품목도\n한 눈에 파악해봐요.",
  "쉽고 빠르게 구매를 요청해보세요.",
  "여러 플랫폼에서 구매한 간식 내역을\n한 곳에서 쉽게 관리해요.",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-start pt-10flex-grow">
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl font-extrabold text-primary-950 leading-tight">
          내가 원하는 간식을 쉽고 빠르게 구매
        </h1>

        <h2 className="mt-2 text-center text-lg sm:text-xl md:text-2xl font-semibold text-primary-300">with Snack</h2>

        <Link
          href="/signup/super-admin"
          className="mt-6 bg-primary-950 text-white px-5 py-2.5 rounded-full flex items-center gap-1"
        >
          <span className="text-base font-bold">Sign Now</span>
          <ArrowRightIcon />
        </Link>

        <div className="mt-10 w-full max-w-[1300px] rounded-[10px] overflow-hidden">
          <Image
            src="/images/landingPage_mobile.png"
            alt="mobile preview"
            width={1300}
            height={600}
            className="block sm:hidden w-full h-auto"
          />

          <Image
            src="/images/landingPage_tablet.png"
            alt="tablet preview"
            width={1300}
            height={600}
            className="hidden sm:block md:hidden w-full h-auto"
          />

          <Image
            src="/images/landingPage_desktop.png"
            alt="desktop preview"
            width={1300}
            height={600}
            className="hidden md:block w-full h-auto"
          />
        </div>
      </div>

      {/* ✅ Desktop/Tablet 고정 슬라이드 */}
      <div className="hidden sm:block fixed bottom-0 w-full py-6 overflow-hidden z-20 bg-transparent backdrop-blur">
        <div className="flex animate-slide gap-10 w-max px-8">
          {[...CARD_TEXTS, ...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
            <div
              key={idx}
              className="h-[112px] px-[30px] py-[30px] bg-white/20 rounded-lg shadow-[0_7px_20px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-primary-100 backdrop-blur-[20px] inline-flex justify-center items-center"
            >
              <div className="text-primary-500 text-base font-medium whitespace-pre-line">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Mobile 고정 슬라이드 */}
      <div className="block sm:hidden fixed bottom-0 w-full z-20 bg-transparent backdrop-blur ">
        <div className="h-[260px] relative">
          {[0, 1].map((row) => (
            <div
              key={row}
              className={`absolute left-0 w-full h-[112px] overflow-hidden ${row === 1 ? "top-[130px]" : "top-0"}`}
            >
              <div className={`flex ${row % 2 === 0 ? "animate-slide" : "animate-slide-reverse"} gap-6 w-max px-8`}>
                {[...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
                  <div
                    key={`row${row}-${idx}`}
                    className="min-w-[250px] h-[112px] px-6 py-4 bg-white/40 rounded-lg shadow-md outline outline-1 outline-offset-[-1px] outline-primary-100 backdrop-blur-[20px] flex items-center justify-center"
                  >
                    <div className="text-primary-500 text-base font-medium whitespace-pre-line text-center">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
