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
    <div className="w-full h-[calc(100vh-80px)] flex flex-col bg-white overflow-hidden">
      <div className="flex-grow" style={{ height: "calc(100vh - 80px - 160px)" }}>
        <div className="flex flex-col items-center justify-start pt-10 px-4">
          <h1 className="text-[24px] sm:text-[40px] md:text-5xl font-extrabold text-primary-950 text-center leading-none whitespace-nowrap">
            내가 원하는 간식을 쉽고 빠르게 구매
          </h1>
          <br />
          <h2 className="text-[20px] sm:text-[24px] md:text-2xl font-semibold text-primary-300 text-center leading-tight">
            with Snack
          </h2>

          <Link
            href="/signup"
            className="mt-6 bg-primary-950 text-white px-5 py-2.5 rounded-full flex items-center gap-1"
          >
            <span className="text-base font-bold">Sign Now</span>
            <ArrowRightIcon />
          </Link>

          <div className="mt-10 w-[90%] max-w-[1300px] h-auto rounded-[10px] overflow-hidden">
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
      </div>

      <div className="hidden sm:block h-[160px] w-full overflow-hidden backdrop-blur-[2px] py-6">
        <div className="flex animate-slide gap-10 w-max px-8">
          {[...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
            <div
              key={idx}
              className="h-[112px] px-[30px] py-[30px] bg-white/40 rounded-lg shadow-[0px_7px_20px_0px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-primary-100 backdrop-blur-[20px] inline-flex justify-center items-center gap-4 w-fit"
            >
              <div className="text-primary-500 text-base font-medium whitespace-pre-line">{text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="block sm:hidden w-full mt-[-80px] mb-[40px] relative z-10">
        <div className="h-[260px] relative backdrop-blur-[2px]">
          <div className="absolute top-0 left-0 w-full h-[112px] overflow-hidden">
            <div className="flex animate-slide gap-6 w-max px-8">
              {[...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="min-w-[250px] h-[112px] px-6 py-4 bg-white/40 rounded-lg shadow-md outline outline-1 outline-offset-[-1px] outline-primary-100 backdrop-blur-[20px] flex items-center justify-center"
                >
                  <div className="text-primary-500 text-base font-medium whitespace-pre-line text-center">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-[116px] left-0 w-full h-[112px] overflow-hidden">
            <div className="flex animate-slide-reverse gap-6 w-max px-8">
              {[...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="min-w-[250px] h-[112px] px-6 py-4 bg-white/40 rounded-lg shadow-md outline outline-1 outline-offset-[-1px] outline-primary-100 backdrop-blur-[20px] flex items-center justify-center"
                >
                  <div className="text-primary-500 text-base font-medium whitespace-pre-line text-center">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
