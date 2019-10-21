package com.roadsideassistv1;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.content.Context;
import android.app.Notification;
import android.app.NotificationManager;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RoadsideAssistV1";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
}
