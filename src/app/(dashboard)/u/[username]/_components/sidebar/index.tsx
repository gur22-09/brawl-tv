import { Navigation } from './navigation';
import { ToggleWrapper } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = () => {
  return (
    <Wrapper>
      <ToggleWrapper />
      <Navigation />
    </Wrapper>
  );
};
