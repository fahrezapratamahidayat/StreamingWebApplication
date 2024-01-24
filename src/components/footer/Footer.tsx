import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="lg:p-10 p-5 mt-[50px]">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-white font-bold text-3xl">
            Seasoned. Nimble. Remote.
          </h1>
        </div>
        <div className="mt-5 flex items-center justify-center flex-col w-full">
          <p className="text-slate-400 text-sm font-normal text-justify lg:text-center lg:w-[659px] w-full">
            Selamat datang di tempat seru kami! Nih, kita punya koleksi film,
            acara TV, dan konten seru lainnya yang bisa kamu nikmatin kapan aja.
            Streaming-nya jernih, ada mode offline-nya juga loh! Biar makin
            asyik, kita juga punya rekomendasi yang oke banget. Makasih udah
            pilih kita buat jadi temen hiburanmu. Selamat menikmati, dan semoga
            kita bisa bikin waktu luangmu makin kece.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button className="text-black bg-white h-9  w-28 rounded-[20px]">
              {" "}
              👀 Insights
            </button>
            <button className="text-black bg-white h-9  w-28 rounded-[20px]">
              Contact
            </button>
          </div>
        </div>
        <div className="lg:mx-32">
          <div className="lg:flex grid grid-cols-2 gap-4 lg:gap-0 lg:justify-around mt-20">
            <div className="flex flex-col items-start">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                NAVIGATION
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link className="hover:text-white" href="/">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white" href="/movies">
                    Movies
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white" href="/movies">
                    TV Shows
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white" href="/animes">
                    Animes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                WHAT I DO
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">Building web applications</li>
                <li className="mb-2">Share with others</li>
                <li className="mb-2">Share with others</li>
                <li className="mb-2">Encouraging Testing</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                LEGAL
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">General Info</li>
                <li className="mb-2">Privacy Policy</li>
                <li className="mb-2">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                CONTACT ME
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a href="">support@ercom.com</a>
                </li>
                <li className="mb-2">+62 8122 3456 7890</li>
                <li className="mb-2">Facebook</li>
                <li className="mb-2">Instagram</li>
                <li className="mb-2">Linkedin</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:mx-32 mx-5 border-t border-white opacity-30 mt-32 -z-20"></div>
        <div className="w-full flex lg:flex-wrap gap-5 lg:gap-0 justify-between lg:items-center lg:px-32 mt-10 pb-10">
          <h1 className="text-white text-5xl text-bold ">Santai</h1>
          <p className="text-slate-400 text-sm font-normal">
            © 2023 Lift Media. All Rights Reserved.{" "}
          </p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="145"
              height="39"
              viewBox="0 0 145 39"
              fill="none"
            >
              <rect
                opacity="0.25"
                x="106.5"
                y="0.5"
                width="38"
                height="38"
                rx="19"
                stroke="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M125.312 16.9262L125.34 17.402L124.871 17.3437C123.161 17.1204 121.668 16.363 120.4 15.091L119.78 14.4599L119.62 14.926C119.282 15.9649 119.498 17.0621 120.202 17.8001C120.578 18.2079 120.494 18.2661 119.845 18.0234C119.62 17.9457 119.423 17.8874 119.404 17.9166C119.338 17.9845 119.564 18.8681 119.742 19.2177C119.986 19.7032 120.484 20.179 121.029 20.4605L121.489 20.6839L120.944 20.6936C120.418 20.6936 120.4 20.7033 120.456 20.9072C120.644 21.5383 121.386 22.2083 122.212 22.4996L122.795 22.7035L122.288 23.0142C121.536 23.4609 120.653 23.7133 119.77 23.7328C119.348 23.7425 119 23.7813 119 23.8104C119 23.9075 120.146 24.4513 120.813 24.6649C122.814 25.296 125.19 25.0242 126.975 23.9464C128.243 23.1793 129.511 21.6549 130.103 20.179C130.422 19.3925 130.742 17.9554 130.742 17.266C130.742 16.8194 130.77 16.7611 131.296 16.2271C131.606 15.9164 131.897 15.5765 131.953 15.4794C132.047 15.2949 132.038 15.2949 131.559 15.46C130.76 15.7513 130.648 15.7124 131.042 15.2755C131.333 14.9648 131.681 14.4016 131.681 14.2366C131.681 14.2074 131.54 14.256 131.38 14.3434C131.211 14.4405 130.835 14.5861 130.554 14.6735L130.046 14.8386L129.586 14.5181C129.333 14.3434 128.976 14.1492 128.788 14.0909C128.309 13.955 127.576 13.9744 127.144 14.1297C125.97 14.5667 125.228 15.693 125.312 16.9262Z"
                fill="white"
              />
              <rect
                opacity="0.25"
                x="53.5"
                y="0.5"
                width="38"
                height="38"
                rx="19"
                stroke="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M69 26H66V17H69V26Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.4911 15H67.474C66.5788 15 66 14.333 66 13.4995C66 12.6483 66.5964 12 67.5087 12C68.4209 12 68.9827 12.6483 69 13.4995C69 14.333 68.4209 15 67.4911 15Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M79.9999 25.9998H77.0519V21.2954C77.0519 20.1137 76.6253 19.3074 75.5581 19.3074C74.7437 19.3074 74.2586 19.851 74.0455 20.376C73.9675 20.5641 73.9484 20.8263 73.9484 21.0891V26H71C71 26 71.0389 18.0318 71 17.2067H73.9484V18.4522C74.3397 17.8535 75.0405 17 76.6057 17C78.5456 17 80 18.2571 80 20.958L79.9999 25.9998Z"
                fill="white"
              />
              <rect
                opacity="0.25"
                x="0.5"
                y="0.5"
                width="38"
                height="38"
                rx="19"
                stroke="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5507 27V19.4994H16V16.9146H17.5507V15.3626C17.5507 13.2539 18.4264 12 20.9142 12H22.9853V14.5851H21.6907C20.7223 14.5851 20.6582 14.9464 20.6582 15.6205L20.6547 16.9143H23L22.7256 19.4991H20.6547V27H17.5507Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
      </footer>
    </>
  );
}
