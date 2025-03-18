import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import PageTitle from "./PageTitle";

describe("PageTitle Component", () => {
  test("제목이 정상적으로 렌더링되는지 확인", () => {
    render(<PageTitle title="테스트 제목" />);
    const heading = screen.getByText("테스트 제목");

    expect(heading).toBeInTheDocument();
  });

  test("기본 클래스가 올바르게 적용되는지 확인", () => {
    render(<PageTitle title="테스트 제목" />);
    const heading = screen.getByText("테스트 제목");

    expect(heading).toHaveClass("text-base");
    expect(heading).toHaveClass("font-semibold");
    expect(heading).toHaveClass("text-slate-900");
  });

  test("isMobileFixed 속성이 true일 때 fixed 클래스가 적용되는지 확인", () => {
    render(<PageTitle title="테스트 제목" isMobileFixed />);
    const heading = screen.getByText("테스트 제목");

    expect(heading).toHaveClass("fixed");
    expect(heading).toHaveClass("top-0");
    expect(heading).toHaveClass("right-0");
    expect(heading).toHaveClass("left-10");
    expect(heading).toHaveClass("px-4");
    expect(heading).toHaveClass("py-3");
  });

  test("사용자 정의 className이 올바르게 적용되는지 확인", () => {
    render(<PageTitle title="테스트 제목" className="custom-class" />);
    const heading = screen.getByText("테스트 제목");

    expect(heading).toHaveClass("custom-class");
  });

  test("title 속성이 정상적으로 표시되는지 확인", () => {
    render(<PageTitle title="Hello, World!" />);
    const heading = screen.getByText("Hello, World!");

    expect(heading).toBeInTheDocument();
  });
});
