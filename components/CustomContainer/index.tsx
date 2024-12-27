import { PageContainer } from '@toolpad/core/PageContainer';
import { styled } from '@mui/material/styles';

const CustomPageContainer = styled(PageContainer)(({ theme }) => ({
  maxWidth: 'none !important',
  width: '100%',
  padding: theme.spacing(2),
}));

export default CustomPageContainer;
