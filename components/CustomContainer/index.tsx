import { PageContainer } from '@toolpad/core/PageContainer';
import { styled } from '@mui/material/styles';

const CustomPageContainer = styled('div')(({ theme }) => ({
  maxWidth: 'none !important',
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
}));

export default CustomPageContainer;
