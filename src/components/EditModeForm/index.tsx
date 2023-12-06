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
  ProductRelationCreateType,
} from '../../models/models';
import {
  useDeleteProductRelationIdMutation,
  useGetDealerProductIdQuery,
  useGetProductRelationIdQuery,
  useGetOwnerProductsMatchByIdQuery,
  useUpdateDealerProductsStatusMutation,
  useCreateProductRelationMutation,
} from '../../store/prosept/prosept.api';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function EditModeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathId = parseInt(location.pathname.match(/\d+/)?.[0] || '0', 10);
  const [isRenderComponent, setIsRenderComponent] =
    React.useState<boolean>(false);
  const relationItem: ProductRelationItem = { id: pathId };
  const [currentId, setCurrentId] = React.useState<number>(0);

  const { data, isLoading } = useGetDealerProductIdQuery({ id: pathId });

  const dealerProductsForPages = useSelector(
    (state: RootState) => state.dealerProducts.dealerProducts,
  );

  const relationData = useGetProductRelationIdQuery({ id: pathId });

  const [createProductRelation] = useCreateProductRelationMutation();
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

  const handleCurrentElement = (event: React.MouseEvent) => {
    const currentTextElement =
      event.currentTarget.getElementsByClassName('productCard__text')[0];

    const parentElements = document.querySelectorAll('.productCard_active');
    parentElements.forEach((element) =>
      element.classList.remove('productCard_active'),
    );

    event.currentTarget.classList.add('productCard_active');
    const productCard_id = parseInt(
      currentTextElement.innerHTML.match(/[0-9]+/)?.[0] || '0',
      10,
    );
    setCurrentId(productCard_id);
  };

  const handleCreateProductRelation = async (
    createRelationItem: ProductRelationCreateType,
  ) => {
    await createProductRelation(createRelationItem);
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
          <Typography variant="h4">Товар дилера</Typography>
          <DealerCard data={data} isLoading={isLoading} />
          <Box display={'flex'} flexDirection={'row'} gap={5}>
            <BasicButton
              text="Предыдущий товар"
              variant="outlined"
              type="button"
              onClick={() => {
                navigate(`/compare/${pathId - 1}`);
                setCurrentId(0);
              }}
            />
            <BasicButton
              text="Следующий товар"
              variant="outlined"
              type="button"
              onClick={() => {
                navigate(`/compare/${pathId + 1}`);
                setCurrentId(0);
              }}
            />
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ fontSize: 40 }}>
          ⇒
        </Divider>
        <Box display={'flex'} flexDirection={'column'} gap={5}>
          <Typography variant="h4">Выберите товар производителя</Typography>
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
                <ProductCard
                  data={item}
                  key={item.owner_id}
                  onClick={handleCurrentElement}
                  owner_id={item.owner_id}
                />
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
              <BasicButton
                text="Сохранить выбор"
                onClick={() => {
                  if (currentId !== 0) {
                    console.log({
                      dealer_product: pathId,
                      owner_product: currentId,
                    });
                    handleCreateProductRelation({
                      dealer_product: pathId,
                      owner_product: currentId,
                    } as ProductRelationCreateType);
                  } else {
                    alert('Выберите элемент для сохранения!!!!');
                  }
                }}
              />
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
