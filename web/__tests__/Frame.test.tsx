// import React from "react";
// import { render, screen } from "@testing-library/react";

// // Mock next/image
// jest.mock("next/image", () => ({
  //   __esModule: true,
  //   default: ({
//     src,
//     alt,
//     width,
//     height,
//     className,
//     priority,
//     style,
//   }: {
//     src: string;
//     alt: string;
//     width?: number | string;
//     height?: number | string;
//     className?: string;
//     priority?: boolean;
//     style?: React.CSSProperties;
//   }) => (
//     // eslint-disable-next-line @next/next/no-img-element
//     <img
//       src={src}
//       alt={alt}
//       width={width}
//       height={height}
//       className={className}
//       data-priority={priority?.toString()}
//       style={style}
//     />
//   ),
// }));

// describe("Frame Component", () => {
//   it("renders correctly with all elements", () => {
//     render(<Frame />);

//     // Verify banner image
//     const banner = screen.getByAltText("A2SV Translator Banner");
//     expect(banner).toBeInTheDocument();
//     expect(banner).toHaveAttribute("src", "/banner.png");
//     expect(banner).toHaveAttribute("width", "333");
//     expect(banner).toHaveAttribute("height", "62");
//     expect(banner).toHaveClass("w-[180px] md:w-[220px] md:h-auto object-contain");
//     expect(banner).toHaveAttribute("data-priority", "true");

//     // Verify message icon
//     const messageIcon = screen.getByAltText("Messages icon");
//     expect(messageIcon).toBeInTheDocument();
//     expect(messageIcon).toHaveAttribute("src", "/messages.png");
//     expect(messageIcon).toHaveAttribute("width", "48");
//     expect(messageIcon).toHaveAttribute("height", "48");
//     expect(messageIcon.parentElement).toHaveClass(
//       "w-[48px] h-[48px] rounded-[8px] mb-8"
//     );
//     expect(messageIcon).toHaveStyle("filter: brightness(0) invert(1)");

//     // Verify text content
//     const text = screen.getByText(
//       /Translate anything, anytime, with ease. A2SV Translator breaks language barriers/
//     );
//     expect(text).toBeInTheDocument();
//     expect(text).toHaveClass(
//       "font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px]"
//     );
//   });

//   it("has correct layout structure", () => {
//     render(<Frame />);

//     // Main container
//     const mainContainer = screen.getByTestId("frame-container");
//     expect(mainContainer).toHaveClass(
//       "flex flex-col h-full w-full bg-[#1A1A1A] text-white"
//     );

//     // Banner container
//     const bannerContainer = mainContainer.firstChild;
//     expect(bannerContainer).toHaveClass("w-full flex justify-center py-4");

//     // Content container
//     const contentContainer = mainContainer.lastChild;
//     expect(contentContainer).toHaveClass(
//       "flex-1 flex flex-col items-center justify-center"
//     );
//   });

  
// });




 import Frame from "../src/app/components/frame/frame";
import { render, screen } from "@testing-library/react";
 // Assuming your Frame component is in Frame.tsx or Frame.jsx

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src, 
    alt,
    width,
    height,
    className,
    priority,
    style,
  }: {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    priority?: boolean;
    style?: React.CSSProperties;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority?.toString()}
      style={style}
    />
  ),
}));

describe("Frame Component", () => {
  it("renders correctly with all elements and their properties", () => {
    render(<Frame />);

    // Verify banner image
    const banner = screen.getByAltText("A2SV Translator Banner");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute("src", "/banner.png");
    expect(banner).toHaveAttribute("width", "333");
    expect(banner).toHaveAttribute("height", "62");
    expect(banner).toHaveClass("w-[180px] md:w-[220px] md:h-auto object-contain");
    expect(banner).toHaveAttribute("data-priority", "true");

    // Verify message icon
    const messageIcon = screen.getByAltText("Messages icon");
    expect(messageIcon).toBeInTheDocument();
    expect(messageIcon).toHaveAttribute("src", "/messages.png");
    expect(messageIcon).toHaveAttribute("width", "48");
    expect(messageIcon).toHaveAttribute("height", "48");
    expect(messageIcon.parentElement).toHaveClass(
      "relative overflow-hidden w-[48px] h-[48px] rounded-[8px] mb-8"
    );
    expect(messageIcon).toHaveStyle("filter: brightness(0) invert(1)");

    // Verify text content
    const text = screen.getByText(
      /Do airport interviews anytime, with ease. Passme breaks language barriers, making communication smooth, fast, and accessible for everyone./
    );
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(
      "font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px] px-6"
    );
  });

  it("has the correct layout structure and styling", () => {
    render(<Frame />);

    // Main container
    const mainContainer = screen.getByTestId("frame-container");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass(
      "flex flex-col h-full w-full bg-[#1A1A1A] text-white"
    );

    // Banner container
    const bannerContainer = mainContainer.firstChild;
    expect(bannerContainer).toBeInTheDocument();
    expect(bannerContainer).toHaveClass("w-full flex justify-center py-4");

    // Content container
    const contentContainer = mainContainer.lastChild;
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass(
      "flex-1 flex flex-col items-center justify-center"
    );

    // Check elements within the content container
    expect(screen.getByAltText("Messages icon").parentElement).toHaveClass(
      "relative overflow-hidden w-[48px] h-[48px] rounded-[8px] mb-8"
    ); // Message icon container
    expect(screen.getByText(
      /Do airport interviews anytime, with ease. Passme breaks language barriers, making communication smooth, fast, and accessible for everyone./
    )).toHaveClass(
      "font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px] px-6"
    ); // Text content
  });
});
