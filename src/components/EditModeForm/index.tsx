import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { BasicButton } from '../BasicButton';
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
  useLazyGetDealerProductIdQuery,
  useLazyGetRelatedOwnerProductQuery,
  useLazyGetOwnerProductsMatchByIdQuery,
  useUpdateDealerProductsStatusMutation,
  useCreateProductRelationMutation,
  useChangeDealerProductStatusMutation,
} from '../../store/prosept/prosept.api';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ResultBox } from '../ResultBox';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader';

export default function EditModeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathId = parseInt(location.pathname.match(/\d+/)?.[0] || '0', 10);
  const [isRenderComponent, setIsRenderComponent] = useState<boolean>(false);
  const relationItem: ProductRelationItem = { id: pathId };
  const [currentId, setCurrentId] = useState<number>(0);

  const [isSaveChoice, setIsSaveChoice] = useState<boolean>(false);
  const [isRejectChoice, setIsRejectChoice] = useState<boolean>(false);
  const [isUnprocessedStatus, setIsUnprocessedStatus] =
    useState<boolean>(false);
  const [isDeleteComparsion, setIsDeleteComparsion] = useState<boolean>(false);

  const [
    triggerDealerProductIdQuery,
    { data: dealerCardData, isFetching: isLoadingDealerCard },
  ] = useLazyGetDealerProductIdQuery();

  const dealerProductsForPages = useSelector(
    (state: RootState) => state.dealerProducts.dealerProducts,
  );

  useEffect(() => {
    triggerDealerProductIdQuery({ id: pathId });
  }, [location]);

  // function findNextPage() {
  //   const current = dealerProductsForPages.results.find(
  //     (item) => item.pk === pathId,
  //   );

  //   const next =
  //     dealerProductsForPages.results[
  //     dealerProductsForPages.results.indexOf(current!) + 1
  //     ];

  //   if (dealerProductsForPages.results.length !== 0) return next.pk;

  //   return 1;
  // }

  const [
    triggerRelatedOwnerProductQuery,
    { data: relationData, isFetching: isLoadindRelationData },
  ] = useLazyGetRelatedOwnerProductQuery();

  const [createProductRelation, { isLoading: isLoadingCreateProduct }] =
    useCreateProductRelationMutation();
  const [
    deleteProductRelationId,
    { isLoading: isLoadingDeleteProductRelation },
  ] = useDeleteProductRelationIdMutation();

  const [
    triggerOwnerProductMatch,
    { data: ownerProductMatch, isFetching: isLoadingOwnerProducts },
  ] = useLazyGetOwnerProductsMatchByIdQuery();

  const [updateDealerProductsStatus, { isLoading: isLoadingUpdateStatus }] =
    useUpdateDealerProductsStatusMutation();

  const [changeDealerProductStatus] = useChangeDealerProductStatusMutation();

  useEffect(() => {
    if (dealerCardData?.combined_status === 'matched') {
      triggerRelatedOwnerProductQuery({
        id: dealerCardData?.pk_owner_product || 0,
      });
    }
  }, [dealerCardData]);

  useEffect(() => {
    if (dealerCardData?.combined_status === 'unprocessed') {
      triggerOwnerProductMatch({
        id: pathId,
      });
    }
  }, [dealerCardData]);

  const handleRemove = (relationItem: ProductRelationItem) => {
    deleteProductRelationId(relationItem);
    setIsDeleteComparsion(true);
  };

  const renderComponent = () => {
    setIsRenderComponent(true);
  };

  const updateProductStatus = () => {
    updateDealerProductsStatus({ id: pathId });
    setIsRejectChoice(true);
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

  const handleRecomparison = () => {
    changeDealerProductStatus({ id: pathId });
    setIsUnprocessedStatus(true);
  };

  useEffect(() => {
    triggerDealerProductIdQuery({ id: pathId });
    setIsSaveChoice(false);
  }, [isSaveChoice]);

  useEffect(() => {
    triggerDealerProductIdQuery({ id: pathId });
    setIsRejectChoice(false);
  }, [isRejectChoice]);

  useEffect(() => {
    triggerDealerProductIdQuery({ id: pathId });
    setIsUnprocessedStatus(false);
  }, [isUnprocessedStatus]);

  useEffect(() => {
    triggerDealerProductIdQuery({ id: pathId });
    setIsDeleteComparsion(false);
  }, [isDeleteComparsion]);

  function setResponceVariant(status: string) {
    switch (status) {
      case 'unprocessed':
        return (
          <>
            {isLoadingOwnerProducts ||
            isLoadingCreateProduct ||
            isLoadingUpdateStatus ||
            isLoadingDeleteProductRelation ? (
              <Preloader />
            ) : (
              <>
                <Typography variant="h4">
                  Выберите товар производителя
                </Typography>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  flexWrap={'wrap'}
                  gap={5}
                  maxWidth={'100%'}
                  flexShrink={1}
                >
                  {ownerProductMatch?.map((item: OwnerProductsMatchType) => (
                    <ProductCard
                      data={item}
                      key={item.id}
                      onClick={handleCurrentElement}
                      id={item.id}
                    />
                  ))}
                </Box>
                <Box display={'flex'} flexDirection={'row'} columnGap={2}>
                  <BasicButton
                    text="Сохранить выбор"
                    onClick={() => {
                      if (currentId !== 0) {
                        handleCreateProductRelation({
                          dealer_product: pathId,
                          owner_product: currentId,
                        } as ProductRelationCreateType);
                        setIsSaveChoice(true);
                      } else {
                        alert('Выберите элемент для сохранения!!!!');
                      }
                    }}
                  />
                  <BasicButton
                    text="Отклонить подборку"
                    color="error"
                    onClick={() => {
                      updateProductStatus();
                    }}
                  />
                </Box>
              </>
            )}
          </>
        );

      case 'postponed':
        return (
          <Stack
            gap={5}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
          >
            <ResultBox result={false}></ResultBox>
            <BasicButton
              text="Сравнить заново"
              color="success"
              onClick={() => {
                handleRecomparison();
              }}
            />
          </Stack>
        );

      case 'matched':
        return (
          <Stack gap={5} alignItems={'flex-start'}>
            <ResultBox
              data={relationData}
              result={true}
              isLoadindRelationData={isLoadindRelationData}
            ></ResultBox>
            <BasicButton
              text="Отменить сопоставление"
              color="warning"
              onClick={renderComponent}
            />
            {isRenderComponent && (
              <PopupWithConfirm
                remove={handleRemove}
                relationItem={relationItem}
                isOpenPopup={true}
              />
            )}
          </Stack>
        );
    }
  }

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
          width={'20vw'}
        >
          <Typography variant="h4">Товар дилера</Typography>
          <DealerCard data={dealerCardData} isLoading={isLoadingDealerCard} />
          <Box display={'flex'} flexDirection={'row'} gap={5}>
            <BasicButton
              text="Предыдущий товар"
              variant="outlined"
              type="button"
              onClick={() => {
                navigate(`/compare/${pathId - 1}`, { replace: false });
                setCurrentId(0);
              }}
            />
            <BasicButton
              text="Следующий товар"
              variant="outlined"
              type="button"
              onClick={() => {
                navigate(`/compare/${pathId + 1}`, { replace: false });
                setCurrentId(0);
              }}
            />
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ fontSize: 40 }}>
          ⇒
        </Divider>
        <Box display={'flex'} flexDirection={'column'} gap={5} width={'60vw'}>
          {dealerCardData?.combined_status &&
            setResponceVariant(dealerCardData.combined_status)}
        </Box>
      </Stack>
    </>
  );
}
