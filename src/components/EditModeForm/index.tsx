import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BasicButton } from '../BasicButton';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { DealerCard } from '../DealerCard';
import { ProductCard } from '../ProductCard';

import { PopupWithConfirm } from '../PopupWithConfirm';
import {
  ProductRelationItem,
  OwnerProductsMatchType,
} from '../../models/models';
import {
  useDeleteProductRelationIdMutation,
  useGetDealerProductIdQuery,
  useGetProductRelationIdQuery,
  useGetOwnerProductsMatchByIdQuery,
  useUpdateDealerProductsStatusMutation,
} from '../../store/prosept/prosept.api';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function EditModeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathId = parseInt(location.pathname.match(/\d+/)?.[0] || '0', 10);
  const [isRenderComponent, setIsRenderComponent] = React.useState(false);
  const relationItem: ProductRelationItem = { id: pathId };

  const { data, isLoading } = useGetDealerProductIdQuery({ id: pathId });

  const dealerProductsForPages = useSelector(
    (state: RootState) => state.dealerProducts.dealerProducts,
  );

  const relationData = useGetProductRelationIdQuery({ id: pathId });

  const [deleteProductRelationId] = useDeleteProductRelationIdMutation();

  const ownerProductMatch = useGetOwnerProductsMatchByIdQuery({ id: pathId });

  const [updateDealerProductsStatus] = useUpdateDealerProductsStatusMutation();

  const handleRemove = (relationItem: ProductRelationItem) => {
    deleteProductRelationId(relationItem);
  };

  const renderComponent = () => {
    setIsRenderComponent(true);
  };

  const updateProductStatus = () => {
    updateDealerProductsStatus({ id: pathId });
  };

  return (
    <>
      <BasicButton
        text="Вернуться на главную"
        variant="outlined"
        type="button"
        onClick={() => {
          navigate('/', { replace: false });
        }}
      />
      <Stack
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-around'}
        alignItems="flex-start"
        marginTop={10}
        border={1}
        borderColor="action.disabledBackground"
        borderRadius={1}
        padding={5}
        columnGap={3}
        position={'relative'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={5}
          position={'sticky'}
          top={100}
          flexShrink={0}
        >
          <Typography variant="h4">Карточка дилера</Typography>
          <DealerCard data={data} isLoading={isLoading} />
          <Box display={'flex'} flexDirection={'row'} gap={5}>
            <BasicButton
              text="Предыдущий товар"
              variant="outlined"
              type="button"
              onClick={() => navigate(`/compare/${pathId - 1}`)}
            />
            <BasicButton
              text="Следующий товар"
              variant="outlined"
              type="button"
              onClick={() => navigate(`/compare/${pathId + 1}`)}
            />
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem>
          Выберите <br />
          совпадение
        </Divider>
        <Box display={'flex'} flexDirection={'column'} gap={5}>
          <Typography variant="h4">
            Список товаров, предложенных моделью
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={5}
            maxWidth={'100%'}
            flexShrink={1}
          >
            {ownerProductMatch.status === 'fulfilled' &&
              ownerProductMatch.data?.map((item: OwnerProductsMatchType) => (
                <ProductCard data={item} key={item.owner_id} />
              ))}
          </Box>
          {relationData.data ? (
            <>
              <BasicButton
                text="Отменить сопоставление"
                color="info"
                onClick={renderComponent}
              />
              {isRenderComponent && (
                <PopupWithConfirm
                  remove={handleRemove}
                  relationItem={relationItem}
                  isOpenPopup={true}
                />
              )}
            </>
          ) : (
            <Box display={'flex'} flexDirection={'row'} columnGap={2}>
              <BasicButton text="Сохранить выбор" />
              <BasicButton
                text="Отклонить подборку"
                color="error"
                onClick={updateProductStatus}
              />
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
}
