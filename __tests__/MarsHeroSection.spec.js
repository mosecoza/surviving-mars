import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Image from "next/image"; // Ensure Image is mocked for testing
import MarsHeroSection from "../app/components/MarsHeroSection";
// import Enzyme, { mount } from 'enzyme'
// import EnzymeAdapter from 'enzyme-adapter-react-16'

// Enzyme.configure({adapter: new EnzymeAdapter()})

jest.doMock("next/image", () => ({
  Image: ({ src, alt }) => <img src={src} alt={alt} />,
}));

test("renders placeholder initially", () => {
  render(<MarsHeroSection />);

  const heroSection = screen.getByTestId("hero-section");
  expect(heroSection.className).toContain("border-2 border-dashed rounded-lg");
  expect(heroSection.className).toContain("border-gray-300");
});

/*
test('fetches and renders image', async () => {

  const wrapper = mount(<MarsHeroSection />)
  await act(async () => await wrapper.state("https://example.com/mars-image.jpg"));

  const heroSection = screen.getByTestId('hero-section');

  await waitFor(() => {
    expect(screen.findByAltText('Mars Landscape')).toBeInTheDocument();
    expect(heroSection.className).toContain('h-64'); 
    expect(heroSection.className).not.toContain('border-2');
    expect(heroSection.className).not.toContain('border-dashed');
  });
});
*/
