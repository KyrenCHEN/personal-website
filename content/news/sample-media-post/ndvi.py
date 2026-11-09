import numpy as np
import rasterio


def ndvi(path: str, red: int = 4, nir: int = 8) -> np.ndarray:
    with rasterio.open(path) as src:
        r, n = (src.read(b).astype("float32") for b in (red, nir))
    with np.errstate(divide="ignore", invalid="ignore"):
        v = (n - r) / (n + r)
    return np.where(np.isfinite(v), v, np.nan)


if __name__ == "__main__":
    v = ndvi("sentinel2_l2a.tif")
    print(f"mean NDVI = {np.nanmean(v):.3f}")
