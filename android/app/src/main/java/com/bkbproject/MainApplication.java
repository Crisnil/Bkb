package com.bkbproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.horcrux.svg.SvgPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rnfs.RNFSPackage;
import com.reactlibrary.RNExitAppPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.masteratul.RNAppstoreVersionCheckerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new RNVersionNumberPackage(),
            new SvgPackage(),
            new RSSignatureCapturePackage(),
            new ImageResizerPackage(),
            new RNGestureHandlerPackage(),
            new RNFSPackage(),
            new RNExitAppPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new RNAppstoreVersionCheckerPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
