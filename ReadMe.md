#### INTIAL SETUP

ddev config
ddev npm i
ddev exec composer require nystudio107/craft-vite
ddev exec php craft plugin/install vite

#### ADD TO ENVIRONMENTS

VITE_USE_DEV_SERVER=1

### START APPLICATION

ddev start
ddev npm run build (Need to Run Once)
ddev npm run dev

## Requirements

- **Node:** > v16.0.0
- **DDEV:** > v1.21.2
