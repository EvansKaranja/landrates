from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import Plot

world_mapping = {
    'shape_length' : 'SHAPE_Area',
    'shape_area' : 'SHAPE_Leng',
    'owner' : 'Owner',
    'identity_number' : 'ID_No',
    'contituency' : 'costituenc',
    'location' : 'Location',
    'land_reference' : 'LR_No',
    'zone' : 'Zone_',
    'land_use' : 'Land_use',
    'ownership' : 'Ownership_',
    'centroid_X' : 'centroid_X',
    'centroid_y' : 'centroid_y',
    'mpoly' : 'MULTIPOLYGON',

}

world_shp = Path(__file__).resolve().parent /'data'/'plotts.shp'

def run(verbose=True):
    lm = LayerMapping(Plot, str(world_shp), world_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)