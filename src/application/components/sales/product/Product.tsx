import * as React from 'react';
import {useContext, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {Avatar, Theme, Typography, useMediaQuery} from '@mui/material';
import {lightBlue} from "@mui/material/colors";
import CurrencyFormatterServiceImpl from "../../../../domain/services/CurrencyFormatterServiceImpl";
import container from "../../../../container";
import SalesContext from "../../../../domain/contexts/sales/SalesContext";
import {addItem} from "../../../../domain/contexts/sales/salesActions";
import {Item} from "../../../../domain/entities/Item";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface SaleDataType {
  productDetails: Item;
}

const Product: React.FC<SaleDataType> = (props) => {
  const salesContext = useContext(SalesContext);
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');

  const [imgSrc, setImgSrc] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const product = {
    id: props.productDetails.id,
    name: props.productDetails.name,
    price: +props.productDetails.price,
    minStockLevel: props.productDetails.minStockLevel,
    status: props.productDetails.status,
    imagePath: props.productDetails.imagePath,
    quantity: 1,
    itemCategoryDo: {
      id: props.productDetails.itemCategoryDo.id,
      name: props.productDetails.itemCategoryDo.name,
      status: props.productDetails.itemCategoryDo.status,
      createdAt: "",
      updatedAt: "",
    },
    createdAt: "",
    updatedAt: "",
    stock: props.productDetails.stock,
    trackStock: props.productDetails.trackStock,
  };

  useEffect(() => {
    setImgSource();
  }, []);

  function setDefaultImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/assets/breakfast4.jpg`;
  }

  function setImgSource() {
    const src = `${process.env.PUBLIC_URL}/assets/${props.productDetails.imagePath.toLowerCase()}`;
    setImgSrc(src);
  }

  const addItemToCartHandler = () => {
    const action = addItem(product);
    salesContext.dispatch(action);
  };

  return (
    <React.Fragment>
      <Card sx={{maxWidth: 400}} onClick={addItemToCartHandler}>
        {!isMobile && (
          <CardMedia
            component="img"
            height="150"
            image={imgSrc}
            alt={imgSrc}
            onError={setDefaultImage}
            onLoad={() => setIsLoading(false)}
          />
        )}
        <CardHeader
          title={
            <Typography variant="h5" color="primary">
              {product.name} {isMobile && product.stock}
            </Typography>
          }
          style={{marginTop: '-15px', width: '100%'}}
          subheader={!isMobile && product.itemCategoryDo.name}
        />
        <CardContent style={{display: 'flex', marginTop: '-30px', marginBottom: '-10px'}}>
          <span style={{marginRight: '10px'}}>
            {!isMobile && (
              <Avatar sx={{bgcolor: lightBlue[500]}} aria-label="recipe">
                {product.stock}
              </Avatar>
            )}
          </span>
          <span>
            <Typography variant="h5" sx={{color: 'primary.main'}}>
              GH&cent; {currencyFormatterService.format(product.price)}
            </Typography>
          </span>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Product;
