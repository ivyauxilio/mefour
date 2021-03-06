import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
import productDisplayMode from './halothemes/productDisplayMode';
import AZBrands from './halothemes/halothemes_AZbrands';

export default class Brand extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        // HaloThemes function
        productDisplayMode();
        AZBrands(this.context);
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container .product-listing');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.brandProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'brand/product-listing',
                sidebar: 'brand/sidebar',
            },
            config: {
                products: {
                    new: true,
                },
                shop_by_brand: true,
                brand: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            showMore: 'brand/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            // HaloThemes function
            productDisplayMode();

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
}
