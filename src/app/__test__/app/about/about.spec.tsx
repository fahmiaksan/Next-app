import AboutPage from "@/app/about/page";
import AboutLayout from "@/app/about/layout";
import {
  render,
  screen
} from '@testing-library/react';

describe('about page', () => {
  it('should render about page', () => {
    const page = render(
      <AboutLayout>
        <AboutPage />
      </AboutLayout>
    );
    expect(page).toMatchSnapshot();
  })
})